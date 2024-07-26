import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question = '';
  answer = '';
  newCategory = '';
  selectedCategory = '';
  categories: string[] = [];
  questions: any[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.getCategories();
    this.getQuestions();
  }

  // Aggiungi una nuova categoria
  addCategory() {
    if (this.newCategory.trim()) {
      this.questionService.addCategory(this.newCategory).subscribe(
        response => {
          console.log('Category added', response);
          this.newCategory = ''; // Pulisco il campo
          this.getCategories(); // Ricarico le categorie
        },
        error => {
          console.error('Error adding category', error);
        }
      );
    }
  }

  // Conferma la rimozione di una categoria
  confirmRemoveCategory(category: string) {
    if (confirm(`Sei sicuro di voler rimuovere la categoria "${category}"?`)) {
      this.removeCategory(category);
    }
  }

  // Rimuovi una categoria
  removeCategory(category: string) {
    this.questionService.removeCategory(category).subscribe(
      response => {
        console.log('Category removed', response);
        this.getCategories(); // Ricarico le categorie
      },
      error => {
        console.error('Error removing category', error);
      }
    );
  }

  // Aggiungi una nuova domanda
  addQuestion() {
    const newQuestion = { category: this.selectedCategory, text: this.question, answer: this.answer };
    this.questionService.addQuestion(newQuestion).subscribe(
      response => {
        console.log('Question added', response);
        this.getQuestions(); // Ricarico la lista delle domande
        this.question = ''; // Pulisco i campi dopo l'aggiunta della domanda
        this.answer = '';
      },
      error => {
        console.error('Error adding question', error);
      }
    );
  }

  // Ottieni tutte le categorie
  getCategories() {
    this.questionService.getCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Ottieni tutte le domande
  getQuestions() {
    this.questionService.searchQuestions(this.selectedCategory, '').subscribe(
      response => {
        this.questions = response;
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }

  // Ricerca le domande
  searchQuestions(event: Event) {
    const target = event.target as HTMLInputElement;
    const keyword = target.value;
    this.questionService.searchQuestions(this.selectedCategory, keyword).subscribe(
      response => {
        this.questions = response;
      },
      error => {
        console.error('Error searching questions', error);
      }
    );
  }
}
