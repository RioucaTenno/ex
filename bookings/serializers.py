from rest_framework import serializers

class BookingSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = serializers.CharField()
    pc_id = serializers.IntegerField()
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    duration = serializers.IntegerField()
    tariff = serializers.CharField(max_length=50)
    status = serializers.CharField(default='pending')