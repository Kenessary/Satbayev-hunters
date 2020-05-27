export interface User {
    fullname: string
    position: string
    email: string
    phone: string
    password: string
    _id?: string
}

export interface Admin {
    name: string,
    phone: string,
    position: string,
    email: string,
    password: string,
    secretword: string,
    _id?: string
}

export interface Message{
    message: string
}

export interface Candidate {
    name: string,
    surname: string,
    email: string
    phone: number
    position: string
    faculty: string
    docsSrc: string
    date: Date
    _id?: string
}

export interface Vote {
    name: string
    surname: string
    email: string
    phone: number
    position: string
    faculty: string
    docsSrc: string
    date: Date
    _id?: string
}

export interface Voteresult{
    name: string,
    surname: string
    position: string,
    posVote: number,
    negVote: number,
    totalvote: number,
    date: Date,
    _id?: string
}

export interface Filter {
    start?: Date,
    end?: Date,
    name?: string,
    surname?: string
}