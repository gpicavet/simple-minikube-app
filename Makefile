build-deps:
	docker build -t myapp-dependencies -f Dockerfile.dep .

build-app:
	docker build -t myapp -f Dockerfile .


build: build-deps build-app

build-in-minikube : 
	./kube-build.sh

deploy:
	kubectl apply -f kubeconf/

delete:
	kubectl delete -f kubeconf/
