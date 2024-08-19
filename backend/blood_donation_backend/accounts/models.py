from django.db import models
from django.contrib.auth.hashers import make_password


class Donor(models.Model):
    BLOOD_TYPE_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES)
    phone_number = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=128)  # Add password field

    def save(self, *args, **kwargs):
        if self.password:
            # Always encrypt the password before saving
            self.password = make_password(self.password)
        super(Donor, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class DeliveryStaff(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    license_number = models.CharField(max_length=50, unique=True)
    vehicle_type = models.CharField(max_length=50)
    password = models.CharField(max_length=128)  # Add password field

    def save(self, *args, **kwargs):
        if self.password:
            # Always encrypt the password before saving
            self.password = make_password(self.password)
        super(DeliveryStaff, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
