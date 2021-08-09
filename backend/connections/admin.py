from django.contrib import admin

# Register your models here.
from connections.models import Connection

admin.site.register(Connection)
