package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

var requests map[string]string = make(map[string]string)
var endpoints map[string]map[string]Endpoint = make(map[string]map[string]Endpoint)
var lock = sync.RWMutex{}

func trapHandler(w http.ResponseWriter, r *http.Request, trimPath string) {
	key := r.Method + trimPath[4:]
	s := "#### REQUEST FROM " + time.Now().String() + "\n\n**Header & metadata**\n\n"
	s = s + fmt.Sprintf("*%+v*", r)
	s = s + "\n\n**BODY**\n\n"
	buf := new(bytes.Buffer)
	buf.ReadFrom(r.Body)
	bodyString := buf.String()
	s = s + "*" + bodyString + "*\n\n___\n\n"
	s = s + requests[key]
	lock.Lock()
	defer lock.Unlock()
	requests[key] = s
	if m, ok1 := endpoints[r.Method]; ok1 {
		if p, ok2 := m[trimPath[4:]]; ok2 {
			code, err := strconv.Atoi(p.ResponseCode)
			if err == nil {
				w.Header().Add("Content-Type", p.ResponseMime)
				w.Header().Add("Access-Control-Allow-Origin", "*")
				w.Header().Add("Access-Control-Allow-Methods",
					"GET,POST,PUT,DELETE,HEAD,OPTIONS")
				w.WriteHeader(code)
			}
			fmt.Fprintf(w, p.Response)
		}
	}
}

func apiHandler(w http.ResponseWriter, r *http.Request, trimPath string) {
	route := trimPath[5:8]
	switch route {
	case "req":
		apiRequesthandler(w, r, trimPath)
	case "end":
		apiEndpointHandler(w, r)
	default:
		handleErr(w, errors.New("API routing error."))
	}
}

func apiEndpointHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json; charset=utf-8")
	switch r.Method {
	case "GET":
		json, err := json.Marshal(endpoints)
		if err != nil {
			handleErr(w, err)
		}
		fmt.Fprintf(w, string(json))
	case "POST":
		var endpoint Endpoint
		buf := new(bytes.Buffer)
		buf.ReadFrom(r.Body)
		err := json.Unmarshal(buf.Bytes(), &endpoint)
		if err != nil {
			handleErr(w, err)
		}
		lock.Lock()
		defer lock.Unlock()
		if v, ok := endpoints[endpoint.Method]; ok {
			v[endpoint.Path] = endpoint
		} else {
			paths := make(map[string]Endpoint)
			paths[endpoint.Path] = endpoint
			endpoints[endpoint.Method] = paths
		}
	case "DELETE":
		var endpoint Endpoint
		buf := new(bytes.Buffer)
		buf.ReadFrom(r.Body)
		err := json.Unmarshal(buf.Bytes(), &endpoint)
		if err != nil {
			handleErr(w, err)
		}
		lock.Lock()
		defer lock.Unlock()
		delete(endpoints[endpoint.Method], endpoint.Path)
	}
}

func apiRequesthandler(w http.ResponseWriter, r *http.Request, trimPath string) {
	w.Header().Add("Content-Type", "application/json; charset=utf-8")
	fmt.Fprintf(w, requests[trimPath[9:]])
}

func handleErr(w http.ResponseWriter, err error) {
	log.Println(err)
	http.Error(w, "Server error.", http.StatusInternalServerError)
}

func main() {
	// First command line argument is context path, e.g. "webtrap/"
	http.HandleFunc("/"+os.Args[1], func(w http.ResponseWriter, r *http.Request) {
		route := "index.html"
		trimPath := strings.ReplaceAll(r.URL.Path, os.Args[1], "")
		if len(trimPath) > 2 {
			route = trimPath[1:4]
		}
		switch route {
		case "trp":
			trapHandler(w, r, trimPath)
		case "api":
			apiHandler(w, r, trimPath)
		default:
			path := "public/" + trimPath[1:]
			log.Println(path)
			http.ServeFile(w, r, path)
		}
	})
	// Second command line argument is port.
	log.Fatal(http.ListenAndServe(":"+os.Args[2], nil))
}
