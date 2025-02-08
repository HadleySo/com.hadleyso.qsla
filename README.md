# [QSL Card Archive](https://qsla.hadleyso.com/)

The QSL Card Archive is part of a project to archive and preserve the 60+ years of QSL cards received by UW-Madison's Badger Amateur Radio Society from around the world. 
This repository and [https://qsla.hadleyso.com/](https://qsla.hadleyso.com/) is a way to make the collection searchable.

There are cards from at the **1950s** and possibly earlier, and from countries that no longer exist.

### How Cards are Processed

Cards are fed though a duplex scanner, either a slower manual feed scanner for fragile cards, or a high speed batch scanner. 
Once scanned they are uploaded and metadata can be entered manually. We use [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) for metadata entry.

Every so often an export is run where all thumbnails are saved and data is exported to JSON. The JSON is reformatted and images and JSON files are uploaded. 
Since the process is manual, there is a delay between scanning in cards and their availability online.

### Progress

As of February 2025 we scanned in about 3,900 cards, and of those cards about 200 with keyed in metadata. 
There is an estimated 21,450 cards in the collection.

### Access to Full Resolution

Cards on the website are shown in lower resolution (because data egress fees add up). 
The full set of high resolution scans is available though an S3 bucket, the bucket is requestor pays so an AWS account is required.

`s3://bars-qsl-requestor-p-tetirxjdzxfqwsggmro5en3nmjyfouse2b-s3alias`

### Contributing 

Read [QSLA: Metadata Contribute](https://qsla.hadleyso.com/metadata-contribute)

### Cite the Project
MLA:
```
So, Hadley, et al. QSL Card Archive. 2025. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, Collection. https://qsla.hadleyso.com.
```

Chicago:
```
So, Hadley, Skylar Culek, and Nicholas Winer. "QSL Card Archive." Collection, QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, 2025.
```

APA:
```
So, H., Culek, S., & Winer, N. (2025). QSL Card Archive [Collection]. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society. https://qsla.hadleyso.com
```
