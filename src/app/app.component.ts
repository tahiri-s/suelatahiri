import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Subject, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-poster';
  result: any
  loading: boolean = false
  isSearchActive: boolean = false
  private readonly searchSubject = new Subject<string | undefined>();
  searchSubscription: any;
  dialogVisible: boolean = false
  selectedMovie: any

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        tap(() => this.loading = true),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(
          (searchQuery) => this.movieService.getByTitle(searchQuery)
          .pipe(
            map(result => ({ ...result, Search: result.Search?.slice(0, 6)})
          )))
      )
      .subscribe((result: any) => {
        this.result = result
        this.loading = false
      });
  }

  showDetails(id: string): void {
    this.movieService.getByImdbId(id)
      .pipe(
        map(data => this.selectedMovie = data)
      ).subscribe(() => this.dialogVisible = true)
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.isSearchActive = Boolean(searchQuery.length)
    this.searchSubject.next(searchQuery?.trim());
  }

}