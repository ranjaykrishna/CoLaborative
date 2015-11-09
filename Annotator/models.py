from django.db import models

class Annotation(models.Model):
  x = models.IntegerField()
  y = models.IntegerField()
  w = models.IntegerField()
  h = models.IntegerField()
  text = models.CharField(max_length=200)
  upVotes = models.IntegerField()
  downVotes = models.IntegerField()
