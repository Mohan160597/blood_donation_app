from rest_framework import serializers
from .models import Donor, DeliveryStaff
from django.contrib.auth.hashers import check_password, make_password

class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ['id', 'name', 'email', 'blood_type', 'phone_number', 'password']

    def validate(self, data):
        # Check for unique email
        if Donor.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'This email is already registered.'})

        # Check for unique phone number
        if Donor.objects.filter(phone_number=data['phone_number']).exists():
            raise serializers.ValidationError({'phone_number': 'This phone number is already registered.'})

        return data

    def create(self, validated_data):
        # Hash password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class DeliveryStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryStaff
        fields = ['id', 'name', 'email', 'license_number', 'vehicle_type', 'password']

    def validate(self, data):
        # Check for unique email
        if DeliveryStaff.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'This email is already registered.'})

        # Check for unique license number
        if DeliveryStaff.objects.filter(license_number=data['license_number']).exists():
            raise serializers.ValidationError({'license_number': 'This license number is already registered.'})

        return data

    def create(self, validated_data):
        # Hash password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class DonorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        donor = Donor.objects.filter(email=email).first()
        if donor and check_password(password, donor.password):
            return donor
        raise serializers.ValidationError('Invalid email or password.')


class DeliveryStaffLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        staff = DeliveryStaff.objects.filter(email=email).first()
        if staff and check_password(password, staff.password):
            return staff
        raise serializers.ValidationError('Invalid email or password.')
