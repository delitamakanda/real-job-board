from rest_framework import serializers

from ..models import Annonce

class AnnonceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Annonce
        fields = ('id', 'title', 'slug', 'enterprise', 'created_date', 'published_date', 'is_available', 'localization', 'contact_name', 'contact_email', 'url_redirection', 'language', 'job_offer', 'job_fields', 'job_time', 'job_description', 'requirements',)