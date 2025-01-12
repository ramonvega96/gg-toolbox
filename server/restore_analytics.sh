# Assign command-line arguments to variables
OLD_INSTANCE=$1
NEW_INSTANCE=$2

# SSH into mango
ssh mango <<ENDSSH1
    
    # SSH into the OLD instance
    ssh -o StrictHostKeyChecking=no $OLD_INSTANCE <<ENDSSH2
        # Navigate to the directory
        cd nutritious-tools/server

        # Remove any previous dump
        rm -rf dump

        # Create the MongoDB dump
        mongodump --db nutritious --collection analytics
ENDSSH2

    # Create directory for the dump in mango
    mkdir -p ${OLD_INSTANCE}-data

    # Copy the dump from the OLD instance to mango
    scp -r -o StrictHostKeyChecking=no root@$OLD_INSTANCE:~/nutritious-tools/server/dump/ ./${OLD_INSTANCE}-data/

    # Copy the dump from mango to the NEW instance
    scp -r -o StrictHostKeyChecking=no ./${OLD_INSTANCE}-data/ root@$NEW_INSTANCE:~/

    
    # SSH into the NEW instance
    ssh -o StrictHostKeyChecking=no $NEW_INSTANCE <<ENDSSH3
        # Navigate to the folder with the dump
        cd ${OLD_INSTANCE}-data

        # Restore the MongoDB collection
        mongorestore

        # Remove the dump
        rm -rf ${OLD_INSTANCE}-data
ENDSSH3
 

ENDSSH1

echo "MongoDB analytics collection migration from $OLD_INSTANCE to $NEW_INSTANCE completed successfully."