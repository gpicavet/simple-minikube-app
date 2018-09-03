simple minikube application setup composed of these pods :
- 2 nginx reverse proxy & load balancer
- 3 myapp instances
- 1 postgresql master with persistent volume on minikube host VM

# Prerequisite

install minikube https://kubernetes.io/docs/tasks/tools/install-minikube/


# run & test

make build-in-minikube

make deploy

./kube-run-initdb.sh

curl -k $(minikube service nginx --url | tail -n 1 | sed 's/http:/https:/')/users
