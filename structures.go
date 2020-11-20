package main

type Endpoint struct {
	Method       string `json:"method"`
	Path         string `json:"path"`
	ResponseCode string `json:"responseCode"`
	Response     string `json:"response"`
}
