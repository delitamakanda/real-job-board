from django import forms
from jobboard.models import Annonce
from authentication.models import Enterprise


class PostAnnonceForm(forms.ModelForm):
    job_offer = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices=Annonce.OFFER_CHOICES)
    job_fields = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices=Annonce.JOB_FIELDS_CHOICES)

    class Meta:
        model = Annonce
        fields = (
            'title',
            'contact_email',
            'localization',
            'job_offer',
            'job_fields',
            'language',
            'url_redirection',
        )
