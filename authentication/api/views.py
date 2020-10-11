from rest_auth.registration.views import RegisterView

from rest_framework import viewsets

from ..models import Enterprise, Student, Employee, Cursus, Job, Cursus, Campus, Faculty, Notification, Message, User

from .serializers import EnterpriseSerializer, UserSerializer, MessageSerializer, NotificationSerializer, FacultySerializer, CampusSerializer, StudentSerializer, EmployeeSerializer, CursusSerializer, JobSerializer, StudentRegisterSerializer, EmployeeRegisterSerializer, EnterpriseRegisterSerializer

class JobViewSet(viewsets.ModelViewSet):

    queryset = Job.objects.all()
    serializer_class = JobSerializer
    pagination_class = None #FIX



class CursusViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Cursus.objects.all()
    serializer_class = CursusSerializer


class EmployeeViewSet(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer



class StudentViewSet(viewsets.ModelViewSet):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class CampusViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Campus.objects.all()
    serializer_class = CampusSerializer


class FacultyViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    pagination_class = None # FIX


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class EnterpriseViewSet(viewsets.ModelViewSet):
    queryset = Enterprise.objects.all()
    serializer_class = EnterpriseSerializer


class MessageViewSet(viewsets.ModelViewSet):

    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class StudentRegistrationView(RegisterView):

    serializer_class = StudentRegisterSerializer


class EmployeeRegistrationView(RegisterView):

    serializer_class = EmployeeRegisterSerializer


class EntrepriseRegistrationView(RegisterView):

    serializer_class = EnterpriseRegisterSerializer