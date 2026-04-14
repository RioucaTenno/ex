from rest_framework import serializers

class ComputerSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    model = serializers.CharField(max_length=100)
    manufacturer = serializers.CharField(max_length=100)
    status = serializers.CharField(default='available')
    specs = serializers.CharField(max_length=500)