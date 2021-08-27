#!/bin/bash
psql -U postgres -c "drop database service_template";
psql -U postgres -c "create database service_template";

#python manage.py migrate;
#python manage.py reset-content;