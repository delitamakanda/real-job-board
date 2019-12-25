from django import forms
from jobboard.models import Annonce
from authentication.models import Enterprise


class PostAnnonceForm(forms.ModelForm):
    language = forms.ChoiceField(widget=forms.RadioSelect, choices=Annonce.LANGUAGES_CHOICES)
    job_time = forms.ChoiceField(widget=forms.RadioSelect, choices=Annonce.TIME_CHOICES)

    class Meta:
        model = Annonce
        fields = (
            'title',
            'contact_email',
            'localization',
            'job_offer',
            'job_fields',
            'job_time',
            'language',
            'url_redirection',
        )
