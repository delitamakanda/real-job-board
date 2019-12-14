from rest_framework import viewsets
from django_filters import rest_framework as filters

from ..models import Annonce

from .serializers import AnnonceSerializer

from ..filters import AnnonceFilter

class AnnonceViewSet(viewsets.ModelViewSet):
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
    filter_backends = ( filters.DjangoFilterBackend, )
    filterset_class = AnnonceFilter