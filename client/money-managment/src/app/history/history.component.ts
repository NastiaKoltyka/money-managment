import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.sevice';

import { History } from '../classes/history';
import { HttpService } from '../http.sevice';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  constructor(private httpService: HttpService, private authService: AuthService) {
    this.httpService.getHistory(authService.user.id).subscribe((data: History) => {
      console.log(data)
    })
  }

  ngOnInit(): void {
  }

}
