from django import template

from authentication.models import Notification

register = template.Library()

@register.filter
def has_unread_notif(user):
    notifications = Notification.objects.filter(receiver=user, seen=False)
    if notifications.exists():
        return True
    return False
