from django.shortcuts import render

# Create your views here.
from bs4 import BeautifulSoup

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout, authenticate, login
from django.utils.translation import ugettext as _
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponseBadRequest, HttpResponse
from django.template.loader import render_to_string

from django.contrib import messages

from authentication.models import User
from authentication.models import Notification

from authentication.forms import StudentProfileForm
from authentication.forms import EmployeeProfileForm
from authentication.forms import EnterpriseProfileForm
from authentication.forms import LoginForm

from django.views.generic import ListView

from jobboard.emails import NotificationEmail

# Create your views here.
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            u = form.cleaned_data['email']
            p = form.cleaned_data['password']
            user = authenticate(email=u, password=p)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('/')
                else:
                    messages.add_message(
                        request, messages.INFO, _('Ce compte a été désactiver.')
                    )
            else:
                messages.add_message(
                    request, messages.ERROR, _('L\'email ou le mot de passe est erroné.')
                )
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('/jobs_list')

def register_view(request):
    if len(request.GET) > 0 and 'profileType' in request.GET:
        employeeForm = EmployeeProfileForm(prefix="em")
        studentForm = StudentProfileForm(prefix="st")
        if request.GET['profileType'] == 'student':
            studentForm = StudentProfileForm(request.GET, prefix="st")
            if studentForm.is_valid():
                studentForm.save()
                return redirect('/auth/access_login')
        elif request.GET['profileType'] == 'employee':
            employeeForm = EmployeeProfileForm(request.GET, prefix="em")
            if employeeForm.is_valid():
                employeeForm.save()
                return redirect('/auth/access_login')
        elif request.GET['profileType'] == 'enterprise':
            enterpriseForm = EnterpriseProfileForm(request.GET, prefix="en")
            if enterpriseForm.is_valid():
                enterpriseForm.save()
                return redirect('/auth/access_login')
        return render(request, 'register.html', {'studentForm': studentForm, 'employeeForm': employeeForm, 'enterpriseForm': enterpriseForm})
    else:
        studentForm = StudentProfileForm(prefix="st")
        employeeForm = EmployeeProfileForm(prefix="em")
        enterpriseForm = EnterpriseProfileForm(prefix="en")
        return render(request, 'register.html', {'studentForm': studentForm, 'employeeForm': employeeForm, 'enterpriseForm': enterpriseForm})


@login_required
def profile(request):
    return render(request, 'user_profile.html', {})


@staff_member_required
def preview_email(request):
    email_types = {
        # 'email_confirmation': ConfirmationEmail,
        'notification': NotificationEmail,
        # 'welcome': WelcomeEmail,
    }
    email_type = request.GET.get('type')
    if email_type not in email_types:
        return HttpResponseBadRequest("Invalid email type")

    if 'user_id' in request.GET:
        user = get_object_or_404(User, request.GET['user_id'])
    else:
        user = request.user

    email = email_types[email_type](user)

    if request.GET.get('plain'):
        text = "Subject: %s\n\n%s" % (email.subject, email.plain)
        print(text)
        return HttpResponse(text, content_type='text/plain')
    else:
        # Insert a table with metadata like Subject, To etc. to top of body
        extra = render_to_string('user_email/metadata.html', {'email': email})
        soup = BeautifulSoup(email.body, 'html5lib')
        soup.body.insert(0, BeautifulSoup(extra, features="html5lib"))

        return HttpResponse(soup.encode())


class NotificationListView(ListView):
    model = Notification
    context_object_name = 'notifications'
    paginate_by = 10
    template_name = 'notifications.html'

    def get_queryset(self):
        notifications = self.model.objects.filter(receiver=self.request.user)

        notifications.update(seen=True)
        return notifications
