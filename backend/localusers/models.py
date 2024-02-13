from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    profile_image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    bio = models.TextField(blank=True, null=True)
    GENDER = [
        ('MALE','MALE'),
        ('FEMALE','FEMALE'),
        ('NON BINARY','NON BINARY'),
        ('OTHER','OTHER'),
    ]
    gender = models.CharField(max_length=20,choices=GENDER, null=True)
    phone_number = models.PositiveIntegerField(null=True)
    
    def __str__(self):
        return f'{self.user.username} Profile'