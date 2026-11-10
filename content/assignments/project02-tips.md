---
title: Tips
type: partial
num: 2
draft: 0
assigned_date: 2026-11-14
due_date: 2026-12-04
hide_from_list: 1
---

## Common Issues and Solutions

### Issue: "Command not found: poetry"
**Solution:** Make sure you've run `poetry install` in the backend directory.

### Issue: `docker build` fails at `poetry install` (backend) or `npm install` (frontend)
**Solution:** Check `pyproject.toml` / `package.json` for typos, missing commas or quotes, and wrong versions. Read the first error in the build output, not the last.

### Issue: `Cannot connect to the Docker daemon`
**Solution:** Docker Desktop isn't running. Start it and wait for it to say it's running.

### Issue: "Module not found" errors
**Solution:** Verify all dependencies are installed and versions match exactly.

### Issue: Database connection errors
**Solution:** Check that the database service is healthy before the backend starts (healthcheck in docker-compose).

### Issue: Frontend can't connect to backend
**Solution:** Verify `VITE_API_URL` environment variable is set correctly in docker-compose.

### Issue: Port already in use
**Solution:** Change ports in docker-compose.yaml or stop other services using those ports.

### Issue: GitHub Actions fails
**Solution:** 
- Check the error message in the Actions tab
- Run the same commands locally that failed in CI
- Fix formatting: `poetry run black .` and `poetry run isort .` in backend
- Fix linting: `npm run fix` in frontend
- Commit and push again

### Issue: "Workflow file not found" in GitHub Actions
**Solution:** Make sure `.github/workflows/pr.yml` exists and is committed to the repository.


## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vite Documentation](https://vitejs.dev/)
