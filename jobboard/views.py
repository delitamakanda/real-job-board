from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404
from django.contrib import messages
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.contrib.contenttypes.models import ContentType

from django.conf import settings
from django.utils.translation import ugettext as _
from django.core.mail import EmailMessage

from authentication.models import User
from authentication.models import Student
from authentication.models import Employee
from authentication.models import Enterprise

from jobboard.models import Annonce
from authentication.models import Notification

from jobboard.filters import AnnonceFilter

from jobboard.forms import PostAnnonceForm

# Create your views here.
def index(request):
    latest_annonces = Annonce.objects.all().filter(is_available=True)
    number_of_annonces = len(latest_annonces)
    annonce_filter = AnnonceFilter(request.GET, queryset=latest_annonces)

    return render(request, 'index.html', {
        'filter': annonce_filter,
        'annonce_filter': annonce_filter,
        'number_of_annonces': number_of_annonces,
    })


@login_required(login_url=reverse_lazy('access_login'), redirect_field_name=None)
def post_annonce(request):
    if request.method == 'POST':
        form = PostAnnonceForm(request.POST, request.FILES)
        if form.is_valid():
            # car = form.save(commit=False)
            #car.owner = request.user
            # car.save()
            instance = form.save(commit=False)
            instance.save()

            receiver = User.objects.filter(email=instance.email).first()
            content_type = ContentType.objects.get(model='annonce')

            notif = Notification.objects.create(
                receiver=receiver,
                content_type=content_type,
                object_id=instance.id,
                status='annonce'
            )

            notif.save()

            messages.add_message(
                request, messages.SUCCESS, _('Annonce ajoutée. N\'oubliez pas de la publier quand elle sera prête.')
            )
            return redirect('jobs_list')
        else:
            print(form.errors)
            messages.add_message(
                request, messages.ERROR, _('Une erreur est survenue.')
            )
    else:
        form = PostAnnonceForm(data=request.GET)

    return render(request, 'post_an_annonce.html', {
        'form': form
    })
