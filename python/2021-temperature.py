#!/usr/bin/python
# -*- coding: UTF8 -*-
# @See http://www.python.org/dev/peps/pep-0263/

#######
# ABOUT
#######

# Temperature analysis

########
# AUTHOR
########

# Teemo Tebest (teemo.tebest@gmail.com)

#########
# LICENSE
#########

# CC-BY-SA 4.0 EBU / Teemo Tebest

#######
# USAGE
#######

# python 2021-temperature.py

# Load the Pandas libraries with alias pd.
import pandas as pd

# Import glob for reading files.
import glob

# Data needs this regular expression:
#Average, (.*), ([A-Z]{3})$ -> Average, "\1", \2

# Combine files.
# https://stackoverflow.com/questions/20906474/import-multiple-csv-files-into-pandas-and-concatenate-into-one-dataframe
all_files = glob.glob('../data/tas*.csv')
df_from_each_file = (pd.read_csv(f, sep=',', quotechar='"', header=0, skipinitialspace=True, names=['Temperature', 'Year', 'Month', 'Country', 'ISO3']) for f in all_files)
df = pd.concat(df_from_each_file, ignore_index=True)

df_metadata = pd.read_csv('../data/metadata.csv')

# Define variables.
# https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
countries = df.ISO3.unique().tolist()
del countries[countries.index("ARM")]
del countries[countries.index("BLZ")]
# countries = ['CAN','FRA','FIN','BRA','USA','ESP']

# Let's calculate the yearly averages per country.
averages = {}
compare_year_start = 1981
compare_year_end = 2010
for country in countries:
  averages[country] = df.loc[(df['ISO3'] == country) & (df['Year'] >= compare_year_start) & (df['Year'] <= compare_year_end)]['Temperature'].mean()

# Define a function that calculates the difference between given numbers.
def distance(a, b): 
  return (max(a, b) - min(a, b)) * (-1 if a > b else 1)

# Let's calculate the anomalities per country and per year.
data_tmp = {}
year_start = 1901
year_end = 2020
for year in range(year_start, (year_end + 1), 1):
  data_tmp[year] = []
  for country in countries:
    data_tmp[year].append({
      'country':country,
      'continent':df_metadata[(df_metadata['Three_Letter_Country_Code'] == country)]['Continent_Name'].values[0],
      'temp':round(distance(averages[country], df.loc[(df['ISO3'] == country) & (df['Year'] == year)]['Temperature'].mean()), 1)
    })
    data_tmp[year].sort(key = lambda x:x['country'])
    data_tmp[year].sort(key = lambda x:x['continent'])

data = {}
i = 0
prev_continent = ''
for year in range(year_start, (year_end + 1), 1):
  data[year] = []
  for country in data_tmp[year]:
    if year == 1901:
      if country['continent'] != prev_continent and prev_continent != '':
        data[year].append({
          'id':i,
          'country':'',
          'continent':'',
          'temp':0
        })
        i = i + 1
        data[year].append({
          'id':i,
          'country':'',
          'continent':'',
          'temp':0
        })
        i = i + 1
      country['id'] = i
      data[year].append(country)
      i = i + 1
    else:
      data[year].append(country)

    prev_continent = country['continent']


# Export data to data.json.
import json
with open('../media/data/data.json', 'w') as outfile:
  json.dump(data, outfile)
