import { Pipe, PipeTransform } from '@angular/core';
import { Voteresult } from '../shared/interfaces'

@Pipe({
    name: 'votesresultFilter'
})


export class VotesresultFilterPipe implements PipeTransform {
    transform(votesresult: Voteresult[], search: string = ''): Voteresult[]{
        if(!search.trim()){
            return votesresult
        }

        return votesresult.filter( voteresult => {
            return voteresult.name.toLowerCase().indexOf(search.toLowerCase()) !==-1 ||
                    voteresult.position.toLowerCase().indexOf(search.toLowerCase()) !==-1
        })
    }
}