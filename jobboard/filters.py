from django import forms
from jobboard.models import Annonce
import django_filters

class AnnonceFilter(django_filters.FilterSet):
    localization = django_filters.CharFilter(lookup_expr='icontains', label='', widget=forms.TextInput(attrs={'placeholder': 'Recherchez une ville'}))
    job_offer = django_filters.MultipleChoiceFilter(choices=Annonce.OFFER_CHOICES, widget=forms.CheckboxSelectMultiple, label='Types de contrats')
    job_fields = django_filters.MultipleChoiceFilter(choices=Annonce.JOB_FIELDS_CHOICES, widget=forms.CheckboxSelectMultiple, label='Domaines d\'emplois')
    job_time = django_filters.MultipleChoiceFilter(choices=Annonce.TIME_CHOICES, widget=forms.CheckboxSelectMultiple, label='Temps de travail')

    class Meta:
        model = Annonce
        fields = ['localization', 'job_offer', 'job_fields', 'job_time']
