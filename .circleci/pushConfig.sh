export CIRCLE_TOKEN=8510380802b037682159311644f3006ef40e08ad
curl --user ${CIRCLE_TOKEN}: \
    --insecure \
    --request POST \
    --form revision=edcb1a11e845c9e5b6d5e137dbb45365adee6989\
    --form config=@test_config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/ganchikov/planner-fsrv/tree/master
    
