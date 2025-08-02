import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Game } from "../../models/game";
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from "../dialog-add-player/dialog-add-player.component";
import { GameInfoComponent } from "../game-info/game-info.component";

@Component({
    selector: "app-game",
    standalone: true,
    imports: [
        CommonModule,
        PlayerComponent,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        GameInfoComponent,
    ],
    templateUrl: "./game.component.html",
    styleUrl: "./game.component.scss",
})
export class GameComponent implements OnInit {
    backgroundImageUrl = "assets/img/board.jpg";
    pickCardAnimation = false;
    game!: Game;
    currentCard: string = "";

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
        this.newGame();
    }

    newGame() {
        this.game = new Game();
        this.currentCard = "";
        this.pickCardAnimation = false;
        console.log("New game started:", this.game);
    }

    takeCard() {
        if (!this.pickCardAnimation && this.game?.stack?.length > 0) {
            this.currentCard = this.game.stack.pop() || "";
            this.pickCardAnimation = true;

            setTimeout(() => {
                this.game.playedCard.push(this.currentCard);
                this.pickCardAnimation = false;
            }, 1000);

            if (this.game.currentPlayer < this.game.players.length - 1) {
                this.game.currentPlayer++;
            } else {
                this.game.currentPlayer = 0;
            }
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent);

        dialogRef.afterClosed().subscribe((name: string) => {
            if (name) {
                this.game.players.push(name);
            }
        });
    }
}
