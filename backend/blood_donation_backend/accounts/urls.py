from django.urls import path
from .views import DeliveryStaffLoginView, DonorCreateView, DeliveryStaffCreateView, DonorLoginView

urlpatterns = [
    path('register/donor/', DonorCreateView.as_view(), name='register_donor'),
    path('register/deliverystaff/', DeliveryStaffCreateView.as_view(), name='register_delivery_staff'),
    path('login/donor/', DonorLoginView.as_view(), name='login_donor'),
    path('login/deliverystaff/', DeliveryStaffLoginView.as_view(), name='login_delivery_staff'),
]
