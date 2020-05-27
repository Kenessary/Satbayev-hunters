import { Pipe, PipeTransform } from '@angular/core';
import { Candidate } from './interfaces';

@Pipe({
    name: 'candidatesFilter'
})

export class CandidatesFilterPipe implements PipeTransform {
    transform(candidates: Candidate[], search: string = ''): Candidate[]{
        if(!search.trim()){
            return candidates
        }

        return candidates.filter( candidate => {
            return candidate.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 ||
                    candidate.position.toLowerCase().indexOf(search.toLowerCase()) !==-1 ||
                    candidate.email.toLowerCase().indexOf(search.toLowerCase()) !==-1
        })
    }

}