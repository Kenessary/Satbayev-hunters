import { Pipe, PipeTransform } from '@angular/core';
import { Vote } from '../shared/interfaces'

@Pipe({
    name: 'votesFilter'
})

export class VotesFilterPipe implements PipeTransform {
    transform(votes: Vote[], search: string = ''): Vote[]{
        if(!search.trim()){
            return votes
        }

        return votes.filter( vote => {
            return vote.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 ||
                    vote.position.toLowerCase().indexOf(search.toLowerCase()) !==-1 ||
                    vote.email.toLowerCase().indexOf(search.toLowerCase()) !==-1
        })
    }
}