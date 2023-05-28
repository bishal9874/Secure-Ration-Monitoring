from django.contrib import admin
from RationSystem.models import RationDetails, RationUser,RationKYC
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html

class RationKYCAdmin(admin.ModelAdmin):
    def user_photo(self, obj):
        return obj.user.user_photo()
    user_photo.short_description = 'User photo'

    list_display = ('user', 'user_email','user_rationId','houseNo', 'village', 'post_office', 'pin', 'user_photo')
    list_filter = ('user__email', 'houseNo', 'village', 'post_office', 'pin','Annual_income','Annual_income',)
    search_fields = ('user__email', 'houseNo', 'village', 'post_office', 'pin')
    fieldsets = (
        ('User Credentials', {'fields': ('user',)}),
        ('KYC Information', {'fields': ('houseNo', 'village', 'post_office', 'pin', 'Annual_income', 'aadharcardNo', 'phoneNo', 'dateofbirth', 'gender', 'state', 'district', 'fpsCode')}),
    )
   
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'

    def user_rationId(self, obj):
        return obj.user.rationId
    user_rationId.short_description = 'RationId'

admin.site.register(RationKYC, RationKYCAdmin)

class UserModelAdmin(BaseUserAdmin):
    def image_tag(self, obj):
        return format_html('<img src="{}" style="width: 120px; height:110px;">'.format(obj.face_image.url))

    list_display = ('id', 'email', 'rationId', 'name', 'tc', 'is_admin', 'image_tag')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'rationId', 'face_image', 'password')}),
        ('Personal info', {'fields': ('name', 'tc',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'rationId', 'name', 'tc', 'face_image', 'password1', 'password2'),
        }),
    )
    
    search_fields = ('email', 'rationId')
    ordering = ('email', 'id')
    filter_horizontal = ()


admin.site.register(RationUser, UserModelAdmin)

class RationDetailsAdmin(admin.ModelAdmin):
    list_display = ('user', 'cardType', 'rice', 'wheat', 'oil', 'kerosene', 'nextRationDate')
    list_filter = ('cardType', 'nextRationDate')
    search_fields = ('user__email',)
admin.site.register(RationDetails, RationDetailsAdmin)