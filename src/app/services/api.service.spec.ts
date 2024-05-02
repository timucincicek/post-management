import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environment/environment';
import { postList } from '../unit-test/post-list';
import { ApiService } from './api.service';

describe('Service: Api', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('getter baseUrl', () => {
    it('should return the baseUrl as expected', () => {
      expect(service.baseUrl).toBe(environment.apiUrl);
    });
  });

  describe('should getPosts', () => {
    it('send GET request to corresponding endpoint', () => {
      service.getPosts().subscribe((response) => {
        expect(response).toEqual(postList);
      });
      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(postList);
    })
  })

});
