from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from jobboard.signals import object_viewed_signal
from ..models import Annonce

from .serializers import AnnonceSerializer

from ..filters import AnnonceFilter

class AnnonceViewSet(viewsets.ModelViewSet):
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
    filter_backends = ( DjangoFilterBackend, filters.SearchFilter, )
    filterset_class = AnnonceFilter
    search_fields = ['^title', 'language', '^job_description', '^requirements', 'enterprise']
    lookup_field = 'slug'
    pagination_class = None # FIX
