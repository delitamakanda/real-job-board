from django.urls import path, include

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('enterprise', views.EnterpriseViewSet)
router.register('job', views.JobViewSet)
router.register('cursus', views.CursusViewSet)
router.register('employee', views.EmployeeViewSet)
router.register('student', views.StudentViewSet)
router.register('campus', views.CampusViewSet)
router.register('faculty', views.FacultyViewSet)
router.register('notification', views.NotificationViewSet)
router.register('user', views.UserViewSet)
router.register('message', views.MessageViewSet)

urlpatterns = [
    path('student-registration', views.StudentRegistrationView.as_view(), name="student_registration"),
    path('employee-registration', views.EmployeeRegistrationView.as_view(), name="employee_registration"),
    path('enterprise-registration', views.EntrepriseRegistrationView.as_view(), name="enterprise_registration"),
    path('', include(router.urls))
]