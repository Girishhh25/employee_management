from django.urls import path
from .views import department_detail, employee_list, department_list, employee_detail

urlpatterns = [
    path('', employee_list),
    path('departments/', department_list),
    path('<int:id>/', employee_detail),
    path('departments/<int:id>/', department_detail),   
]