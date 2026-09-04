package com.senac.biblioteca.controller;

import com.senac.biblioteca.model.Emprestimo;
import com.senac.biblioteca.service.EmprestimoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000",
        "https://projeto1-biblioteca.vercel.app"
})
public class EmprestimoController {

    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public List<Emprestimo> listar() {
        return emprestimoService.listarTodos();
    }

    @GetMapping("/atrasados")
    public List<Emprestimo> listarAtrasados() {
        return emprestimoService.listarAtrasados();
    }

    @PostMapping
    public Emprestimo emprestar(@RequestBody Emprestimo emprestimo) {
        return emprestimoService.emprestar(emprestimo);
    }

    @PutMapping("/{id}/devolver")
    public Emprestimo devolver(@PathVariable Long id) {
        return emprestimoService.devolver(id);
    }
}
