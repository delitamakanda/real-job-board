from rest_framework import viewsets
from django_filters import rest_framework as filters

from jobboard.signals import object_viewed_signal
from ..models import Annonce

from .serializers import AnnonceSerializer

from ..filters import AnnonceFilter

class AnnonceViewSet(viewsets.ModelViewSet):
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
    filter_backends = ( filters.DjangoFilterBackend, )
    filterset_class = AnnonceFilter
    lookup_field = 'slug'
