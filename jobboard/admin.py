from django.contrib import admin
from django import forms

from jobboard.models import Annonce

# Register your models here.
class AnnonceAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'is_available', 'enterprise', 'localization']
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ['is_available']
    search_fields = ['localization', 'enterprise__username']
    list_editable = ['is_available',]

    class Meta:
        model = Annonce

    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super(AnnonceAdmin, self).formfield_for_dbfield(db_field, **kwargs)
        if 'description' in db_field.name or db_field.name == 'requirements':
            formfield.widget = forms.Textarea(attrs=formfield.widget.attrs)
        return formfield



admin.site.register(Annonce, AnnonceAdmin)
