from django.http import HttpResponse
from django.shortcuts import render
from .models import Product


# Create your views here.
#/products->index
def index(request):
    products=Product.objects.all() #here we can use .filter(), .save() , .get() methods also
    return render(request,'index.html',
                {'products':products})


def new(request):
    return HttpResponse('New Products')

