# Assign command-line arguments to variables
UQ_USERNAME=$1
INSTANCE_NAME=$2

# SSH into mango
ssh mango <<ENDSSH1
    
    # SSH into the GrowGo instance
    ssh -o StrictHostKeyChecking=no $INSTANCE_NAME <<ENDSSH2
        # Navigate to the directory
        cd nutritious-tools/server

        # Remove any previous dump
        rm -rf dump

        # Create the MongoDB dump
        mongodump --db nutritious --collection analytics
ENDSSH2

    # Remove dump directory if it exists already
    rm -r ${INSTANCE_NAME}-data

    # Create directory for the dump in mango
    mkdir -p ${INSTANCE_NAME}-data

    # Copy the dump from the OLD instance to mango
    scp -r -o StrictHostKeyChecking=no root@$INSTANCE_NAME:~/nutritious-tools/server/dump/ ./${INSTANCE_NAME}-data/

ENDSSH1

# Create a directory for the data dump
mkdir -p ${INSTANCE_NAME}-data

# Copy the dump into the local environment
scp -r ${UQ_USERNAME}@mango:~/${INSTANCE_NAME}-data/dump/ ./${INSTANCE_NAME}-data

# Navigate to the folder where the dump was dropped
cd ${INSTANCE_NAME}-data

# Restore the analytics collection content
mongorestore

# return to server directory
cd ..

# Remove dump directory
rm -r ${INSTANCE_NAME}-data

echo "MongoDB analytics collection extraction from $INSTANCE_NAME successfully."