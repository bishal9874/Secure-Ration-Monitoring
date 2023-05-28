
    
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.utils.safestring import mark_safe
import datetime
#Custom user Manager
class MyUserManager(BaseUserManager):
    def create_user(self, email,rationId ,name,tc,face_image,password=None,password2=None):
        """
        Creates and saves a User with the given email, name, tc and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not face_image:
            raise ValueError("Users must have an Face ID ")

        user = self.model(
            email=self.normalize_email(email),
            rationId = rationId,
            name = name,
            tc=tc,
            face_image = face_image
        )

        user.set_password(password)
        user.save(using=self._db)
        
        return user
        

    def create_superuser(self, email,rationId ,name,tc,face_image, password=None):
        """
        Creates and saves a superuser with the given email, name, tc and password.
        """
        
        user = self.create_user(
            email,
            rationId = rationId,
            password=password,
            name=name,
            tc=tc,
            face_image=face_image
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

#Custom user Model




class RationUser(AbstractBaseUser):
    def user_dir_path(instance, filename):
        filename = f'{instance.rationId}.jpg'
        return 'user_{0}/{1}'.format(instance.rationId, filename)
    
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    rationId = models.CharField(max_length=255,unique=True)
    name = models.CharField(max_length=200)
    tc = models.BooleanField()
    face_image = models.FileField(upload_to=user_dir_path)
    # kyc_profile = models.OneToOneField(RationKYC, on_delete=models.CASCADE, null=True, blank=True)
    # date_of_birth = models.DateField()
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at =  models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
  
    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','rationId','tc','face_image']

    

    def __str__(self):
        return self.email
    
    def user_photo(self):
        return mark_safe('<img src="{}" width="100" />'.format(self.face_image.url))
    user_photo.allow_tags = True
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class RationKYC(models.Model):
    user = models.ForeignKey(RationUser, on_delete=models.CASCADE)
    houseNo = models.CharField(max_length=99)
    village = models.CharField(max_length=255)
    post_office = models.CharField(max_length=255)
    pin = models.CharField(max_length=6)
    Annual_income = models.CharField(max_length=10)
    aadharcardNo = models.CharField(max_length=14)
    phoneNo = models.CharField(max_length=10)
    dateofbirth = models.DateField()
    gender=models.CharField(max_length=10)
    state=models.CharField(max_length=40)
    district=models.CharField(max_length=40)
    fpsCode=models.CharField(max_length=18)


    
    def get_card_type(self):
        if int(self.Annual_income) <= 27000:
            return 'BPL'
        else:
            return 'APL'
    
    def __str__(self):
        return self.user.email
    
class RationDetails(models.Model):
    user = models.ForeignKey(RationUser, on_delete=models.CASCADE)
    cardType = models.CharField(max_length=30)
    rice = models.CharField(max_length=10)
    wheat=models.CharField(max_length=10)
    oil=models.CharField(max_length=10)
    kerosene=models.CharField(max_length=10)
    nextRationDate = models.DateField()
    
    def save(self, *args, **kwargs):
        kyc = RationKYC.objects.get(user=self.user)
        card_type = kyc.get_card_type()
        print(card_type)
        if card_type == 'BPL':
            self.rice = '10 kg'
            self.wheat = '10 kg'
            self.oil = '1 L'
            self.kerosene = '1 L'
        else:
            self.rice = '5 kg'
            self.wheat = '5 kg'
            self.oil = '500 mL'
            self.kerosene = '500 mL'
        self.cardType = card_type

        # Calculate next ration date
        frequency = 30 # In days
        current_date = datetime.date.today()
        next_date = current_date + datetime.timedelta(days=frequency)
        self.nextRationDate = next_date

        super(RationDetails, self).save(*args, **kwargs)

      

    
