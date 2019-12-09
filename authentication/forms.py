from django import forms
from django.forms.widgets import SelectDateWidget
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from authentication.models import User
from authentication.models import Student
from authentication.models import Employee
from authentication.models import Enterprise
from authentication.models import Message

class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirmer le mot de passe', widget=forms.PasswordInput)
    birth_date = forms.DateField(widget=SelectDateWidget(years=range(2020, 1945, -1),empty_label=("Choose Year", "Choose Month", "Choose Day"),),)
    field_order = ['first_name', 'last_name', 'email', 'password', 'password2']

    class Meta:
        model = User
        fields = ('email',)

    def clean_email(self):
        email = self.cleaned_data.get('email')
        qs = User.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("email is taken")
        return email

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(RegisterForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserAdminCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email',)

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserAdminCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserAdminChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'password', 'active', 'admin')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]


class EnterpriseProfileForm(RegisterForm):
    description = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Enterprise
        exclude = ('network', 'active', 'staff', 'admin', 'last_login', 'username',)


class EmployeeProfileForm(RegisterForm):


    class Meta:
        model = Employee
        exclude = ('network', 'active', 'staff', 'admin', 'last_login', 'username',)


class StudentProfileForm(RegisterForm):
    year = forms.DateField(widget=SelectDateWidget())

    class Meta:
        model = Student
        exclude = ('network', 'active', 'staff', 'admin', 'last_login', 'username',)



class LoginForm(forms.Form):
    email = forms.EmailField(label='Courriel', max_length=64)
    password = forms.CharField(label='Mot de passe', widget=forms.PasswordInput())


class MessageForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Please enter the message'}))

    class Meta:
        model = Message
        fields = (
            'author',
            'topic',
            'content',
        )
