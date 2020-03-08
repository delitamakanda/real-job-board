from django.db import models

import uuid

from django.db import models
from django.contrib.auth.models import ( BaseUserManager, AbstractBaseUser )
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    registration_number = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    birth_date = models.DateField(blank=True, null=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
    )
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    home_phone_number = models.CharField(max_length=20, blank=True)
    mobile_phone_number = models.CharField(max_length=30, blank=True)
    network = models.ManyToManyField('self')
    # faculty = models.ForeignKey('Faculty', on_delete=models.CASCADE, blank=True, null=True)
    user_type = 'generic'
    username = models.CharField(
        verbose_name='username',
        max_length=255,
        unique=True,
        null=True,
        blank=True
    )
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return 'User {} {}'.format(self.last_name, self.first_name)

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        super(User, self).save(*args, **kwargs)


class Message(models.Model):
    GENERAL = 'GE'
    GREETING = 'GR'
    DISLIKE = 'DI'
    LIKE = 'LI'
    TOPIC_CHOICES = (
        (GENERAL,'General'),
        (GREETING, 'Greeting'),
        (DISLIKE, 'Dislike'),
        (LIKE, 'Like'),
    )
    topic = models.CharField(
        max_length=2,
        choices=TOPIC_CHOICES,
        default=GENERAL,
    )
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    publication_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'

    def __str__(self):
        if len(self.content) > 20:
            return self.content[:19] + "..."
        else:
            return self.content


class ContentTypeToGetModel(object):

    """
    requires fields:
        - content_type: FK(ContentType)
        - object_id: PositiveIntegerField()
    """

    def get_related_object(self):
        """
        return the related object of content_type.
        eg: <Question: Holisticly grow synergistic best practices>
        """
        # This should return an error: MultipleObjectsReturned
        # return self.content_type.get_object_for_this_type()
        # So, i handle it with this one:
        model_class = self.content_type.model_class()
        return model_class.objects.get(id=self.object_id)

    @property
    def _model_name(self):
        """
        return lowercase of model name.
        eg: `question`, `answer`
        """
        return self.get_related_object()._meta.model_name


class Notification(models.Model, ContentTypeToGetModel):
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notification_receiver',on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, related_name='notifications', on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    STATUS_CHOICES = (
        ('annonce', _('an annonce')),
        ('reply', _('a reply')),
        ('message', _('a message'))
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='message')
    seen = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        title = _('%(receiver)s have a %(status)s in the %(model)s:%(id)s')
        return title % {'receiver': self.receiver.first_name, 'status': self.status, 'model': self._model_name, 'id': self.object_id}

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ['-created']


class Faculty(models.Model):
    name = models.CharField(max_length=255, unique=True)
    color = models.CharField(max_length=10)

    class Meta:
        verbose_name = 'Faculty'
        verbose_name_plural = 'Faculties'

    def __str__(self):
        return 'Faculté: {}'.format(self.name)


class Campus(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=1000)

    class Meta:
        verbose_name = 'Campus'
        verbose_name_plural = 'Campus'

    def __str__(self):
        return 'Campus: {}'.format(self.name)


class Job(models.Model):
    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return 'Job Title: {}'.format(self.title)


class Cursus(models.Model):
    title = models.CharField(max_length=255, unique=True)

    class Meta:
        verbose_name = 'Cursus'
        verbose_name_plural = 'Cursus'

    def __str__(self):
        return 'Cursus: {}'.format(self.title)


class Employee(User):
    office = models.CharField(max_length=30)
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, blank=True, null=True)
    job = models.ForeignKey(Job, on_delete=models.SET_NULL, blank=True, null=True)
    user_type = 'employee'

    def __str__(self):
        return 'Employee {}'.format(self.job.title)


class Student(User):
    cursus = models.ForeignKey(Cursus, on_delete=models.SET_NULL, blank=True, null=True)
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, blank=True, null=True)
    user_type = 'student'
    year = models.IntegerField()

    def __str__(self):
        return 'Student {}'.format(self.faculty.name)


class Enterprise(User):
    logo = models.ImageField(upload_to='enterprise_image/%Y/%m/%d/', blank=True)
    office = models.CharField(max_length=30)
    address = models.TextField()
    description = models.CharField(max_length=300, blank=True)
    user_type = 'enterprise'

    @property
    def logo_url(self):
        if self.logo and hasattr(self.logo, 'url'):
            return self.logo.url

    def __str__(self):
        return 'Enterprise {}'.format(self.office)
