import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { Recipe } from "./recipe.model";
import { DataStoreService } from "../shared/data-store.service";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: "root" })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStoreService: DataStoreService,
    private recipeService: RecipeService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStoreService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
