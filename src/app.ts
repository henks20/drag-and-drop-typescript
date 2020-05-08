// można niby tutaj mieć wszystkie importy ale bez sensu skoro tego tutaj nie używamy a w innych plikach
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
