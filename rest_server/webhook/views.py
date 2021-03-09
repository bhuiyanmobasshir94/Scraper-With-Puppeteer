from django.contrib.auth.models import User, Group
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import (
    UserSerializer,
    GroupSerializer,
    ItemSerializer,
)
from .models import Item
from rest_framework.views import APIView
from rest_framework.response import Response
from slack_webhook import Slack

slack = Slack(
    url="xx"
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ItemCreateAPIView(APIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = ()

    def post(self, request):
        items = list(request.data["items"])
        for item in items:
            try:
                obj, created = Item.objects.update_or_create(**item)
                if created and obj.title.startswith(("Xiaomi", "Infinix")):
                    slack.post(
                        text=f"New Item added!! {obj.title}, url: {obj.url}, status: {obj.stock_status}"
                    )
                else:
                    if obj.stock_status == "" and obj.title.startswith(
                        ("Xiaomi", "Infinix")
                    ):
                        slack.post(
                            text=f"Stock Available!! {obj.title}, url: {obj.url}, status: {obj.stock_status}"
                        )
            except Exception as e:
                print(e)
        return Response("")


class ItemListAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
