export CIRCLE_TOKEN=8510380802b037682159311644f3006ef40e08ad
curl --user ${CIRCLE_TOKEN}: \
    --insecure \
    --request POST \
    --form revision=eb60a22d3fe6dc2f2194ca2ba8ee750db936fb9f\
    --form config=@test_config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/ganchikov/planner-fsrv/tree/master
    
