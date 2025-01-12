read -p 'Enter UQ Username ' uservar

USERNAME=$uservar

if [ ! $USERNAME ]
then
    echo "USAGE: $0 mango_username"
    exit 1
fi

rm -rf src/db/data

mkdir src/db/data

mkdir src/db/data/seeding-files

mkdir src/db/data/seeding-logs

mkdir src/db/data/links-testing-logs

mkdir src/db/data/dump-data-files

mkdir src/db/data/backup-data-files

scp -r $USERNAME@mango.eait.uq.edu.au:/home/groups/elipse-projects/2022_NutritiousTools/data/csv/* src/db/data/seeding-files/