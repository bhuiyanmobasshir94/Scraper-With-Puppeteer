from django.db import models


class Item(models.Model):
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=600, unique=True)
    stock_status = models.CharField(max_length=200, null=True, blank=True)
    price = models.CharField(max_length=200, null=True, blank=True)
    requested_price = models.IntegerField(null=True, blank=True)
    discount_price = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
